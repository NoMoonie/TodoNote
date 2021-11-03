using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TodoApi.Models{
    public class Todo{
        public int Id { get; set; }
        public string Title { get; set; }
        public bool IsComplete { get; set; }
        public string Text { get; set; }

    }
}