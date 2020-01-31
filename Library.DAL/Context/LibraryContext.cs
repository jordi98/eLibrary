using Library.DAL.Models;
using Microsoft.EntityFrameworkCore;
namespace Library.DAL.Context
{
    public class LibraryContext : DbContext
    {
        public DbSet<Book> Books { get; set; }
        public LibraryContext(DbContextOptions<LibraryContext> options) : base(options) { }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Book>().HasData(
                new Book { Id = 1, Title = "Kobzar", Author = "Taras Shevchenko", Genre = "Zbirka", Year = 2010 },
                new Book { Id = 2, Title = "Contra spem spero", Author = "Lesia Ukrainka ", Genre = "Hud Lit", Year = 1894 }
            );
        }
    }
}
