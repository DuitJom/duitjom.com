const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');

function endpoint(name) {
  const file = path.join(root, 'src/api', name + '.ts');
  assert.ok(fs.existsSync(file), 'Merchant ID lookup must be available without a passkey');
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const module = { exports: {} };
  const load = (id) => id === 'zitejs/backend' ? { createEndpoint: (definition) => definition } : require(id);
  new Function('require', 'module', 'exports', code)(load, module, module.exports);
  return module.exports.default;
}

test('known Merchant ID can be found before a passkey is entered', async () => {
  const lookup = endpoint('findMerchant');
  const result = await lookup.execute({ input: lookup.inputSchema.parse({ merchantId: '2000162100241' }) });
  assert.equal(result.valid, true);
  assert.equal(Object.hasOwn(result, 'passkey'), false);
});

test('unknown Merchant ID is rejected', async () => {
  const lookup = endpoint('findMerchant');
  assert.equal((await lookup.execute({ input: { merchantId: '0000000000000' } })).valid, false);
});

test('Merchant ID lookup trims surrounding spaces', async () => {
  const lookup = endpoint('findMerchant');
  assert.equal((await lookup.execute({ input: { merchantId: ' 2000162100241 ' } })).valid, true);
});

test('passkey verification still requires a passkey and rejects incorrect credentials', async () => {
  const verify = endpoint('verifyMerchant');
  assert.equal(verify.inputSchema.safeParse({ merchantId: '2000162100241' }).success, false);
  assert.equal((await verify.execute({ input: { merchantId: '2000162100241', passkey: 'incorrect' } })).valid, false);
  assert.equal((await verify.execute({ input: { merchantId: '0000000000000', passkey: 'incorrect' } })).valid, false);
});

function loginHarness(component = 'LoginStepOne') {
  const calls = { availability: 0, registration: 0 };
  const states = [], effects = [], timers = [];
  let cursor = 0, now = 0, nextId = 0;
  const react = {
    useState(initial) {
      const slot = cursor++;
      if (!(slot in states)) states[slot] = initial;
      return [states[slot], value => { states[slot] = typeof value === 'function' ? value(states[slot]) : value; }];
    },
    useEffect(effect, dependencies) {
      const slot = cursor++;
      const previous = effects[slot];
      if (!previous || dependencies.some((value, index) => value !== previous.dependencies[index])) {
        previous?.cleanup?.();
        effects[slot] = { dependencies, cleanup: effect() };
      }
    },
    useRef(value) { const slot = cursor++; return states[slot] ||= { current: value }; },
  };
  const setTimer = (callback, delay) => { const id = ++nextId; timers.push({ id, callback, at: now + delay }); return id; };
  const clearTimer = id => { const item = timers.find(item => item.id === id); if (item) item.cancelled = true; };
  const source = fs.readFileSync(path.join(root, 'src/components/' + component + '.tsx'), 'utf8');
  const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022 } }).outputText;
  const module = { exports: {} };
  const load = id => {
    if (id === 'react') return react;
    if (id === 'react/jsx-runtime') return require(id);
    if (id === 'zitejs/api') return { findMerchant: async () => ({ valid: true }), verifyMerchant: async input => ({ valid: input.passkey === 'test-valid-key' }), checkDashboardAvailability: async () => { calls.availability++; return { available: false }; }, sendRegistration: async () => { calls.registration++; return { success: true }; } };
    if (id === 'framer-motion') return { AnimatePresence: 'AnimatePresence', motion: { div: 'motion.div' } };
    if (id === './icons') return { LiveCheck: 'LiveCheck' };
    if (id.startsWith('./')) return { __esModule: true, default: path.basename(id) };
    return new Proxy({}, { get: (_, key) => String(key) });
  };
  new Function('require', 'module', 'exports', 'setTimeout', 'clearTimeout', code)(load, module, module.exports, setTimer, clearTimer);
  const completed = [];
  const props = { onContinue: (...args) => completed.push(args), onLogout: () => completed.push('logout') };
  const render = () => { cursor = 0; let tree = module.exports.default(props); while (typeof tree.type === 'function') tree = tree.type(tree.props); return tree; };
  function nodes(node) {
    if (!node || typeof node !== 'object') return [];
    if (Array.isArray(node)) return node.flatMap(nodes);
    return [node, ...nodes(node.props?.children)];
  }
  return {
    render: () => nodes(render()), completed, calls,
    async advance(ms) {
      now += ms;
      for (const timer of [...timers]) if (!timer.cancelled && timer.at <= now) { timer.cancelled = true; timer.callback(); }
      await Promise.resolve(); await Promise.resolve(); await Promise.resolve();
    },
  };
}

test('sign-in keeps passkey hidden until company Continue and advances only 3 seconds after verification', async () => {
  const ui = loginHarness();
  let nodes = ui.render();
  assert.equal(nodes.some(node => node.props?.id === 'merchant-passkey'), false, 'Passkey is hidden initially');
  nodes.find(node => node.props?.id === 'merchant-id').props.onChange({ target: { value: '2000162100241' } });
  nodes = ui.render();
  const find = nodes.find(node => node.props?.onClick && node.props?.children?.props?.children?.includes?.(' Find'));
  const findButton = find || nodes.find(node => node.type === 'Button' && node.props.onClick);
  assert.equal(findButton.props.disabled, false, 'Find requires only Merchant ID');
  const searching = findButton.props.onClick();
  await ui.advance(6999);
  assert.equal(ui.render().some(node => node.type === 'MerchantCard'), false);
  await ui.advance(1); await searching;
  nodes = ui.render();
  nodes.find(node => node.type === 'MerchantCard').props.onContinue();
  nodes = ui.render();
  nodes.find(node => node.props?.id === 'merchant-passkey').props.onChange({ target: { value: 'test-valid-key' } });
  nodes = ui.render();
  const continueButton = nodes.find(node => node.type === 'Button' && node.props.onClick && !node.props.disabled);
  await continueButton.props.onClick();
  nodes = ui.render();
  assert.equal(ui.completed.length, 0);
  assert.ok(nodes.some(node => JSON.stringify(node.props?.children || '').includes('Passkey successfully verified.')));
  await ui.advance(2999);
  assert.equal(ui.completed.length, 0);
  await ui.advance(1);
  assert.equal(ui.completed.length, 1);
});


test('completed client form opens only the temporary error page and logout returns to Merchant ID', () => {
  const ui = loginHarness('../App');
  let nodes = ui.render();
  nodes.find(node => node.type === 'LoginStepOne').props.onContinue('2000162100241');
  nodes = ui.render();
  assert.equal(nodes.some(node => node.type === 'LoginStepOne'), false);
  nodes.find(node => node.type === 'LoginStepTwo').props.onDone('client@example.com');
  nodes = ui.render();
  assert.equal(nodes.some(node => node.type === 'SectionView'), false);
  assert.equal(nodes.some(node => node.type === 'Sidebar'), false);
  nodes.find(node => node.type === 'TemporaryError').props.onLogout();
  nodes = ui.render();
  assert.equal(nodes.some(node => node.type === 'LoginStepOne'), true);
});

test('Retry checks dashboard availability without resubmitting client registration', async () => {
  const ui = loginHarness('TemporaryError');
  let nodes = ui.render();
  const buttons = nodes.filter(node => node.type === 'Button');
  assert.equal(buttons.length, 2);
  await buttons[1].props.onClick();
  nodes = ui.render();
  assert.equal(ui.calls.availability, 1);
  assert.equal(ui.calls.registration, 0);
  assert.equal(ui.completed.length, 0);
  assert.ok(nodes.some(node => node.props?.children === 'The dashboard is still being updated. Please try again later.'));
  nodes.find(node => node.type === 'Button').props.onClick();
  assert.deepEqual(ui.completed, ['logout']);
});
