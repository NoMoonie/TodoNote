using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using TodoApi.Repositories;
using TodoApi.Models;

namespace TodoApi.Controllers{
    
    [Route("api/[controller]")]
    [ApiController]
    public class TodoController : ControllerBase {
        
        private readonly ITodoRepository _todorepository;

        public TodoController(ITodoRepository todorepository){
            _todorepository = todorepository;
        }

        [HttpGet]
        public async Task<IEnumerable<Todo>> GetTodos(){
            return await _todorepository.Get();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Todo>> GetTodo(int id){
            return await _todorepository.Get(id);
        }

        [HttpPost]
        public async Task<ActionResult<Todo>> PostTodo([FromBody] Todo todo){
            var NewTodo = await _todorepository.Create(todo);
            return CreatedAtAction(nameof(GetTodos), new {id = NewTodo.Id}, todo);
        }

        [HttpPut]
        public async Task<ActionResult> PutTodo(int id, [FromBody] Todo todo){
            if(id != todo.Id){
                return BadRequest();
            }
            await _todorepository.Update(todo);
            return NoContent();
        }

        [HttpDelete]
        public async Task<ActionResult> DeleteTodo(int id){
            var TodoToDelete = await _todorepository.Get(id);
            if(TodoToDelete == null){
                return NotFound();
            }
            await _todorepository.Delete(TodoToDelete.Id);
            return NoContent();
        }


    }
}
