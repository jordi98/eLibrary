using Library.DAL.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace Library.BLL.Identity
{
    public class SeedUsersWithRoles
    {
        public static async void Initialize(IServiceProvider serviceProvider)
        {
            var _roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();
            var _userManager = serviceProvider.GetRequiredService<UserManager<ApplicationUser>>();
            string[] roleNames = { "Admin", "User" };
            IdentityResult roleResult;

            foreach (var roleName in roleNames)
            {
                var roleExist = await _roleManager.RoleExistsAsync(roleName);
                if (!roleExist)
                {
                    roleResult = await _roleManager.CreateAsync(new IdentityRole(roleName));
                }
            }

            ApplicationUser admin = await _userManager.FindByEmailAsync("Admin1@gmail.com");

            if (admin == null)
            {
                admin = new ApplicationUser()
                {
                    UserName = "Admin1@gmail.com",
                    Email = "Admin1@gmail.com",
                };
                await _userManager.CreateAsync(admin, "Admin1@123");
            }
            await _userManager.AddToRoleAsync(admin, "Admin");

            ApplicationUser user1 = await _userManager.FindByEmailAsync("testuser1@gmail.com");

            if (user1 == null)
            {
                user1 = new ApplicationUser()
                {
                    UserName = "testuser1@gmail.com",
                    Email = "testuser1@gmail.com",
                };
                await _userManager.CreateAsync(user1, "Testuser1@123");
            }
            await _userManager.AddToRoleAsync(user1, "User");

            ApplicationUser user2 = await _userManager.FindByEmailAsync("testuser2@gmail.com");

            if (user2 == null)
            {
                user2 = new ApplicationUser()
                {
                    UserName = "testuser2@gmail.com ",
                    Email = "testuser2@gmail.com",
                };
                await _userManager.CreateAsync(user2, "Testuser2@123");
            }
            await _userManager.AddToRoleAsync(user2, "User");
        }
    }
}
