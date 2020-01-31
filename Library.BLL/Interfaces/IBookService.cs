using Library.DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Library.BLL.Interfaces
{
    public interface IBookService
    {
        Task<List<Book>> GetBooks();
        Task<Book> GetBook(int id);
        Task UpdateBook(Book book);
        Task<Book> CreateBook(Book book);
        Task DeleteBook(Book book);
    }
}
