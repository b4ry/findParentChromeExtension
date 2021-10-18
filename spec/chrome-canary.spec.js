test('chrome is mocked', () => {
  expect(chrome).toBeDefined();
  expect(chrome.runtime.onMessage).toBeDefined();
})
