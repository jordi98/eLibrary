﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Library.DAL.Models
{
    public class Book
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public string Genre { get; set; }
        public int Year { get; set; }
    }
}
