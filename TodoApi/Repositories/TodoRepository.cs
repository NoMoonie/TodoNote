using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodoApi.Models;
using Microsoft.EntityFrameworkCore;

namespace TodoApi.Repositories{

    public class TodoRepository : ITodoRepository {
        
        private readonly TodoContext _context;
        public TodoRepository(TodoContext context)
        {
            _context = context;
        }

        public async Task<Todo> Create(Todo todo)
        {
            _context.Todos.Add(todo);
            await _context.SaveChangesAsync();
            return todo;
        }

        public async Task Delete(int id)
        {
            var TodoToDelete = await _context.Todos.FindAsync(id);
            _context.Todos.Remove(TodoToDelete);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Todo>> Get()
        {
            return await _context.Todos.ToListAsync();
        }

        public async Task<Todo> Get(int id)
        {
            return await _context.Todos.FindAsync(id);
        }

        public async Task Update(Todo todo)
        {
            _context.Entry(todo).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
    }

}