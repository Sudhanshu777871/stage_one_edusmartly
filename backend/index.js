const express = require("express");
const app = express();
const cors = require("cors");
const config = require("./config");
require("dotenv").config();
// applying the middleware
app.use(express.json());
app.use(cors());

// CREATING THE LOGIN API
app.post("/login", (req, res) => {
  if (req.body.Academic_Id && req.body.Password) {
    const { Academic_Id, Password } = req.body;
    // code for SQL query
    config.query(
      "SELECT * FROM academic_credentials WHERE Academic_Id = ? AND Password = ?",
      [Academic_Id, Password],
      (error, results) => {
        if (error) throw error;
        res.send(results);
      }
    );
  } else {
    res.send("Please Enter All The Fields");
  }
});

// CREATING THE API FRO FETCHING THE NUMBER OF STUDENTS
app.get("/student_fetch", (req, res) => {
  config.query(
    "SELECT COUNT(Student_Id) as student_no FROM student_credentials",
    (error, result) => {
      if (error) throw error;
      res.send(result);
    }
  );
});

// CREATING THE API FRO FETCHING THE NUMBER OF TEACHERS
app.get("/teacher_fetch", (req, res) => {
  config.query(
    "SELECT COUNT(Teacher_Id) as teacher_no FROM teacher_credentials",
    (error, result) => {
      if (error) throw error;
      res.send(result);
    }
  );
});

// CREATING THE API FRO FETCHING NUMBER OF WORKERS
app.get("/worker_fetch", (req, res) => {
  config.query(
    "SELECT COUNT(Worker_Id) as worker_no FROM worker_data",
    (error, result) => {
      if (error) throw error;
      res.send(result);
    }
  );
});

// CREATING THE API FOR INSERING THE EXPENSE DATA
app.post("/expense_data_insert", (req, res) => {
  const { information, amount } = req.body;
  config.query(
    "INSERT INTO academic_expenses (Expense_Information,Amount) VALUES (?,?)",
    [information, amount],
    (error, result) => {
      if (error) throw error;
      res.send(result);
    }
  );
});

// CREATING THE API FRO FETCHING ALL EXPENSES
app.get("/all_expenses", (req, res) => {
  config.query(
    "SELECT * FROM academic_expenses ORDER BY Serial_Number DESC",
    (error, result) => {
      if (error) throw error;
      res.send(result);
    }
  );
});

// CREATING THE API FRO DELETING THE ITEMS
app.delete("/del_item_expense", (req, res) => {
  const { id } = req.body;
  config.query(
    "DELETE FROM academic_expenses WHERE Serial_Number = ?",
    [id],
    (error, result) => {
      if (error) throw error;
      res.send(result);
    }
  );
});

// CREATING API FOR FETCHING THE FEES OF THE DATA
app.get("/fees_structure", (req, res) => {
  config.query("SELECT * FROM fee_structure", async (error, result) => {
    if (error) throw error;
    // sending the result
    res.send(result);
  });
});


// CODE EFO RMAKING THE FUNCTION OF API FOR NEW ADMISSION
app.post('/new_admission', (req, res) => {
  if (req.body.Student_ID && req.body.fName && req.body.lName && req.body.myClass && req.body.ParentName && req.body.Address && req.body.PhoneNo && req.body.Email && req.body.DOB) {
    const { Student_ID, fName, lName, myClass, ParentName, Address, PhoneNo, Email, DOB } = req.body;
    config.query("INSERT INTO student_data (Student_Id,First_Name, Last_Name, Class, Parent_Name, Address, Phone_No, Email, DOB) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?)", [Student_ID, fName, lName, myClass, ParentName, Address, PhoneNo, Email, DOB], (error, result) => {
      if (error) {
        console.log(error)
      }
      // RUNNING NEW FRO INSERTING THE DATA INTO STUDNET CREDENTAILS QUERY
      else {
        config.query("INSERT INTO student_credentials (Student_Id,Attendance, Fees, Marks, Password) VALUES (?,?, ?, ?, ?)", [Student_ID, 0, 0, 0, '12345'], (error, result) => {
          if (error) throw error
          // sending the result
          res.send(result)
        })
      }
    })
  }
  else {
    res.send("Please Enter All The Fields...")
  }
})


// API FOR SEARCHING THE STUDNETS
app.post('/serach_students', (req, res) => {
  if (req.body.studentData && req.body.studentClass) {
    const { studentData, studentClass } = req.body
    config.query(`SELECT * FROM student_data WHERE First_Name LIKE ? OR Student_Id LIKE ? ORDER BY CASE WHEN First_Name LIKE ? OR Student_Id LIKE ? THEN 1 WHEN Class LIKE ? THEN 2 ELSE 3 END`, [studentData, studentData, studentData, studentData, studentClass], (error, result) => {
      if (error) throw error

      /// sending the result if no error is occured
      res.send(result)
    })
  }
  else {
    res.send("Please Enter All The Field First...")
  }

})


// API FOR SHOW STUDENT PROFILE
app.post('/student_profile', (req, res) => {
  if (req.body.student_Id) {
    const { student_Id } = req.body
    config.query("SELECT * FROM student_data WHERE Student_Id = ?", [student_Id], (error, result) => {
      if (error) throw error
      // sending the response
      res.send(result)
    })
  }
  else {
    res.send("Please Send Student ID")
  }
})

// API FOR SHOW UPDATE STUDENT PROFILE
app.post('/update_profile', (req, res) => {
  if (req.body.studentId && req.body.fName && req.body.lName && req.body.Address && req.body.PhoneNo && req.body.Email) {
    const { studentId, fName, lName, ParentName, Address, PhoneNo, Email } = req.body;
    config.query("UPDATE student_data SET First_Name = ?, Last_Name = ?, Parent_Name = ?, Address = ?, Phone_No = ?, Email= ? WHERE Student_Id = ?", [fName, lName, ParentName, Address, PhoneNo, Email, studentId], (error, result) => {
      if (error) throw error
      // sending the response
      res.send(result)
    })
  }

  else {
    res.send("Please Enter All The Field")
  }
})


// API FOR MAKING THE FETCHING OF THE STUDNET FEES
app.post('/student_fee_show', (req, res) => {
  if (req.body.studentfee_Id) {
    const { studentfee_Id } = req.body
    config.query("SELECT * FROM student_credentials WHERE Student_Id = ?", [studentfee_Id], (error, result) => {
      if (error) throw error
      // sending the result
      res.send(result)
    })
  }
  else {
    res.send("Please Enter Student-ID The Details")
  }
})


// CREATING THE API FRO DELETING THE STUDENT
app.delete("/delete_student", (req, res) => {
  if (req.body.Student_Id) {
    const { Student_Id } = req.body;
    config.query("DELETE FROM student_data WHERE Student_Id = ?", [Student_Id], (error) => {
      if (error) {
        res.send(error)
      }
      else {
        config.query("DELETE FROM student_credentials WHERE Student_Id = ?", [Student_Id], (error, result) => {
          if (error) throw error
          // sending the result
          res.send(result)
        })
      }
    }
    );
  }
  else {
    res.send("Please Send The Student-ID")
  }
});


// API FOR NEW FACULTY 
app.post("/new_faculty", (req, res) => {
  if (req.body.teacherId && req.body.fNaam && req.body.sNaam && req.body.education && req.body.addhar && req.body.address && req.body.phone && req.body.email && req.body.salary) {
    const { teacherId, fNaam, sNaam, education, phone, address, salary, addhar, email } = req.body
    config.query("INSERT INTO teacher_credentials (Teacher_Id,	First_Name,Second_Name, Qualification,	Phone, Address, Salary,	Addhar, Email, Password) VALUES (?,?, ?, ?, ?, ?, ?, ?,?,?)", [teacherId, fNaam, sNaam, education, phone, address, salary, addhar, email, 'edu@12345'], (error, result) => {
      if (error) throw error
      // sending the result
      res.send(result)
    })
  }
  else {
    res.send("Please Enter The Student-ID")
  }
})


// API FOR FETCHING ALL THE DETAILS ABOUT FACULTY
app.get('/faculty_fetch', (req, res) => {

  config.query("SELECT * FROM teacher_credentials", (error, result) => {
    if (error) throw error
    // sending the result
    res.send(result)
  })
})


// CREATING THE API FRO DELETING THE STUDENT
app.delete("/delete_faculty", (req, res) => {
  if (req.body.Teacher_Id) {
    const { Teacher_Id } = req.body;
    config.query("DELETE FROM teacher_credentials WHERE Teacher_Id = ?", [Teacher_Id], (error, result) => {
      if (error) throw error
      // sending the result
      res.send(result)

    }
    );
  }
  else {
    res.send("Please Send The Teacher-ID")
  }
});


// API FOR SHOW TEACHER PROFILE FOR UPDATION (PRE-FILLES)
app.post('/faculty_profile_prefill', (req, res) => {
  if (req.body.Teacher_Id) {
    const { Teacher_Id } = req.body
    config.query("SELECT * FROM teacher_credentials WHERE Teacher_Id = ?", [Teacher_Id], (error, result) => {
      if (error) throw error
      // sending the response
      res.send(result)
    })
  }
  else {
    res.send("Please Send Teacher-ID")
  }
})

// API FOR SHOW UPDATE FACULTY PROFILE
app.put('/faculty_profile_update', (req, res) => {
  if (req.body.teacherId && req.body.fNaam && req.body.sNaam && req.body.education && req.body.addhar && req.body.address && req.body.phone && req.body.email && req.body.salary) {
    const { teacherId, fNaam, sNaam, education, addhar, address, phone, email, salary } = req.body;
    config.query("UPDATE teacher_credentials SET 	First_Name = ?, Second_Name = ?, Qualification = ?, Phone = ?, Address = ?, Salary=?, Addhar = ?, Email= ? WHERE Teacher_Id = ?", [fNaam, sNaam, education, phone, address, salary, addhar, email, teacherId], (error, result) => {
      if (error) throw error
      // sending the response
      res.send(result)
    })
  }

  else {
    res.send("Please Enter All The Field")
  }
})


// MAKING API FOR ADDING TH CLASS SCHEDULE
app.post('/schedule_add', (req, res) => {
  if (req.body.teacherId && req.body.teacherName && req.body.subjectName && req.body.myclass) {
    const { teacherId, teacherName, subjectName, myclass } = req.body
    config.query("INSERT INTO master_data (Teacher_Id, Teacher_Name	, Class, Subject) VALUES (?,?,?,?)", [teacherId, teacherName, myclass, subjectName], (error, result) => {
      if (error) throw error
      // sending the response
      res.send(result)
    })
  }
  else {
    res.send("Please Send All The Details First...")
  }
})

// MAKING API FOR FETCHING ALL THE DTEAILS ABOUT THE MANAGEFACULTY
app.get('/show_all_schedule', (req, res) => {
  config.query("SELECT * FROM master_data", (error, success) => {
    if (error) throw error
    // sending the data
    res.send(success)
  })
})

// CODE FOR MAKING THE API OF SEARCHING THE SCHEDULE
app.post('/search_schedule', (req, res) => {
  if (req.body.searchData && req.body.searchClass) {
    const { searchData, searchClass } = req.body
    config.query("SELECT * FROM master_data WHERE Teacher_Name LIKE ? OR Teacher_Id LIKE ? ORDER BY CASE WHEN Teacher_Name LIKE ? OR Teacher_Id LIKE ? THEN 1 WHEN Class LIKE ? THEN 2 ELSE 3 END", [searchData, searchData, searchData, searchData, searchClass], (error, result) => {
      if (error) throw error
      // sending the result
      res.send(result)
    })
  }
  else {
    res.send("Please Send The Search Data and Class")
  }
})

// CREATING THE API FRO DELETING THE CLASS SCHEDULE
app.delete("/delete_schedule", (req, res) => {
  if (req.body.id) {
    const { id } = req.body;
    config.query("DELETE FROM master_data WHERE Serial_Number	 = ?", [id], (error, result) => {
      if (error) throw error
      // sending the result
      res.send(result)

    }
    );
  }
  else {
    res.send("Please Send The Teacher-ID")
  }
});

// MAING API FOR UPDATING THE FEES STATUS

app.put('/updates_fees', (req, res) => {
  if (req.body.feesStatus && req.body.studentId) {
    const {feesStatus,studentId} = req.body
    config.query("UPDATE student_credentials SET 	Fees = ? WHERE Student_Id	 = ?", [feesStatus, studentId], (error, result) => {
      if (error) throw error
      // sending the result
      res.send(result)
    })
  }
  else {
    res.send("Please Send The Fees Status And Student ID")
  }

})
// Listening The App
app.listen(process.env.RUNNING_PORT);
