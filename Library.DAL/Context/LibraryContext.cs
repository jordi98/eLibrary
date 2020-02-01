using Library.DAL.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Library.DAL.Context
{
    public class LibraryContext : IdentityDbContext<ApplicationUser>
    {
        public DbSet<Book> Books { get; set; }
        public DbSet<ApplicationUser> ApplicationUsers { get; set; }
        public LibraryContext(DbContextOptions<LibraryContext> options) : base(options) { }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Book>().HasData(
                new Book { Id = 1, Title = "Kobzar", Author = "Taras Shevchenko", Genre = "Zbirka", Year = 2010 },
                new Book { Id = 2, Title = "Contra spem spero", Author = "Lesia Ukrainka ", Genre = "Hud Lit", Year = 1894 }
            );
        }
    }
}
