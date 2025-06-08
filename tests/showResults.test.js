const test = require('node:test');
const assert = require('assert');
const { showResults } = require('../js/script');

function createMockDocument() {
  const elements = {};
  return {
    createElement: () => ({
      className: '',
      innerHTML: '',
      children: [],
      appendChild(child) {
        this.children.push(child);
      }
    }),
    getElementById: id => {
      if (!elements[id]) {
        elements[id] = {
          innerHTML: '',
          children: [],
          appendChild(child) {
            this.children.push(child);
            this.innerHTML += child.innerHTML;
          }
        };
      }
      return elements[id];
    }
  };
}

test('filters articles by query', () => {
  const mockDocument = createMockDocument();
  global.document = mockDocument;
  showResults('قوة');
  const div = mockDocument.getElementById('searchResults');
  assert.strictEqual(div.children.length, 1);
  assert.ok(div.innerHTML.includes('قوة المعرفة'));
  delete global.document;
});

test('returns no results when no match', () => {
  const mockDocument = createMockDocument();
  global.document = mockDocument;
  showResults('لايوجد');
  const div = mockDocument.getElementById('searchResults');
  assert.strictEqual(div.innerHTML, '<p>لا توجد نتائج.</p>');
  delete global.document;
});
