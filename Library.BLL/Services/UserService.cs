using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Library.BLL.Interfaces;
using Library.DAL.Context;
using Library.DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace Library.BLL.Services
{
    public class UserService : IUserService
    {
        private readonly LibraryContext _context;
        public UserService(LibraryContext context)
        {
            _context = context;
        }
        public async Task<ApplicationUser> CreateUser(ApplicationUser user)
        {
            _context.ApplicationUsers.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task DeleteUser(ApplicationUser user)
        {
            _context.ApplicationUsers.Remove(user);
            await _context.SaveChangesAsync();
        }

        public async Task<List<ApplicationUser>> GetUser(string name)
        {
            var users = _context.ApplicationUsers.AsQueryable();
            if (!string.IsNullOrEmpty(name))
            {
                var cleanTerm = name.ToLowerInvariant().Trim();
                users = users.Where(m => m.UserName.ToLowerInvariant().Contains(name) || m.Email.ToLowerInvariant().Contains(name));
            }
            return await users.ToListAsync();
        }

        public async Task<ApplicationUser> GetUserById(string id)
        {
            return await _context.ApplicationUsers.Where(m => m.Id == id).FirstOrDefaultAsync();
        }

        public async Task<List<ApplicationUser>> GetUsers()
        {
            return await _context.ApplicationUsers.ToListAsync();
        }

        public async Task UpdateUser(ApplicationUser user)
        {
            _context.Entry(user).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
    }
}
