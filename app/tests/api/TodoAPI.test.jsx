var expect = require('expect');

var TodoAPI = require('TodoAPI');

describe('TodoAPI', () => {

  it('should exist', () => {
    expect(TodoAPI).toExist();
  });

  describe('setTodos', () => {

    beforeEach(() => {
      localStorage.removeItem('todos');
    });

    it('should set valid todos array', () => {
      var todos = [{
        id: 23,
        text: 'Test',
        completed: false
      }];
      TodoAPI.setTodos(todos);

      var actualTodos = JSON.parse(localStorage.getItem('todos'));

      expect(actualTodos).toEqual(todos);
    });

    it('should not set invalid todos array', () => {
      var badTodos = {a: 'b'};
      TodoAPI.setTodos(badTodos);

      expect(localStorage.getItem('todos')).toEqual(null);
    });
  });

  describe('getTodos', () => {
    it('should return empty array for bad localStorage data', () => {
      var actualTodos = TodoAPI.getTodos();
      expect(actualTodos).toEqual([]);
    });

    it('should return todos if valid array in localStorage', () => {
      var todos = [{
        id: 23,
        text: 'Test',
        completed: false
      }];

      localStorage.setItem('todos', JSON.stringify(todos));

      var actualTodos = TodoAPI.getTodos();

      expect(actualTodos).toEqual(todos);
    });
  });

  describe('filterTodos', () => {
    var todos = [{
      id: 1,
      text: 'Some text here',
      completed: true
    },{
      id: 2,
      text: 'Some text here2',
      completed: false
    },{
      id: 3,
      text: 'Some text here3',
      completed: true
    }];

    it('should return all items if showCompleted is true', () => {
      var filterTodos = TodoAPI.filterTodos(todos, true, '');
      expect(filterTodos.length).toBe(3);
    });

    it('should return none completed todos when showCompleted is false', () => {
      var filterTodos = TodoAPI.filterTodos(todos, false, '');
      expect(filterTodos.length).toBe(1);
    });

    it('should sort by completed status', () => {
      var filterTodos = TodoAPI.filterTodos(todos, true, '');
      expect(filterTodos[0].completed).toBe(false);
    });

    it('should filterTodos by searchText', () => {
      var filterTodos = TodoAPI.filterTodos(todos, true, 'here2');
      expect(filterTodos.length).toBe(1);
    });

    it('should return all todos if searchText is empty', () => {
      var filterTodos = TodoAPI.filterTodos(todos, true, '');
      expect(filterTodos.length).toBe(3);
    });

  });

});
