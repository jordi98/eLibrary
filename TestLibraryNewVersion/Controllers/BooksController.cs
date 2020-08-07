﻿using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Library.DAL.Models;
using Library.BLL.Interfaces;
using Microsoft.Extensions.Logging;

namespace TestLibraryNewVersion.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly IBookService _bookService;
        private readonly ILogger _logger;
        public BooksController(IBookService bookService, ILogger<BooksController> logger)
        {
            _logger = logger;
            _bookService = bookService;
        }

        // GET: api/Books
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Book>>> GetBooks()
        {
            _logger.LogInformation("Get Books");
            _logger.LogError("Error Get Books");
            return await _bookService.GetBooks();
        }

        // GET: api/Books/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Book>> GetBook(int id)
        {
            var book = await _bookService.GetBook(id);

            if (book == null)
            {
                _logger.LogError("Book with {id} is not found!", id);
                return NotFound();
            }

            return book;
        }

        // PUT: api/Books/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBook(int id, Book book)
        {
            if (id != book.Id)
            {
                _logger.LogError("Book with {id} is not found!", id);
                return BadRequest();
            }

            try
            {
                _logger.LogInformation("Editing book with id {id}", id);
                await _bookService.UpdateBook(book);
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }

            return NoContent();
        }

        // POST: api/Books
        [HttpPost]
        public async Task<ActionResult<Book>> PostBook(Book book)
        {
            await _bookService.CreateBook(book);

            return CreatedAtAction("GetBook", new { id = book.Id }, book);
        }

        // DELETE: api/Books/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Book>> DeleteBook(int id)
        {
            var book = await _bookService.GetBook(id);
            if (book == null)
            {
                return NotFound();
            }

            await _bookService.DeleteBook(book);

            return book;
        }
    }
}
