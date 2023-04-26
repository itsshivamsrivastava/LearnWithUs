import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import Courses from './components/courses/Courses';
import Tutorials from './components/tutorials/Tutorials';
import Blog from './components/blog/Blog';
import Notes from './components/notes/Notes';
import Bookshelf from './components/bookshelf/Bookshelf';
import Contact from './components/contact/Contact';
import Signup from './components/signup-login/Signup';
import UserProfile from './components/userProfile/UserProfile';
import TutorialDashboard from './components/tutDashboard/TutorialDashboard';
import TutEdit from './components/tutDashboard/TutEdit';
import Tutorial from './components/tutorials/Tutorial';
import Blogpost from './components/blog/Blogpost';
import EditTutorial from './components/tutDashboard/EditTutorial';
import Dashboard from './components/courses/Dashboard';
import AddCourse from './components/courses/AddCourse';
import Course from './components/courses/Course';
import UpdateCourse from './components/courses/UpdateCourse';
import AdminLogin from './components/admin/AdminLogin';
import NotesDashboard from './components/notes/NotesDashboard';
import NotesEdit from './components/notes/NotesEdit';
import AddNotes from './components/notes/AddNotes';
import Footer from './components/footer/Footer';
import Testimonial from './components/footer/Testimonial';

function App() {
  return (
    <>
        <Router>
          {/* Navbar - Start */}
          <Navbar title="LearnWithUs" />
          {/* Navbar - End */}

          <Routes>
            {/* Home - Start */}
            <Route exact path="/" element={<Home welcomeHeading="LearnWithUs" />} />
            {/* Home - End */}

            {/* Admin Panel - Start */}
            <Route exact path="/adminlogin" element={<AdminLogin />} />
            {/* Admin Panel - End */}

            {/* Contact - Start */}
            <Route exact path="/contact" element={<Contact />} />
            {/* Contact - End */}

            {/* Sign Up - Start */}
            <Route exact path="/signup" element={<Signup />} />
            {/* Sign Up - End */}

            {/* UserProfile - Start */}
            <Route exact path="/userProfile" element={<UserProfile />} />
            {/* UserProfile - End */}

            {/* Tutorial Module - Start */}
            <Route exact path="/tutorials" element={<Tutorials />} />
            <Route exact path="/tutorialDashboard" element={<TutorialDashboard />} />
            <Route exact path="/tutEdit" element={<TutEdit />} />
            <Route exact path="/tutEdit/:urlslug" element={<TutEdit />} />
            <Route exact path="/tutEdit/:id" element={<TutEdit />} />
            <Route exact path="/editTutorial/:urlslug" element={<EditTutorial />} />
            <Route exact path='/tutorial/:slug' element={<Tutorial />} />
            {/* Tutorial Module - End */}

            {/* Course - Start */}
            <Route exact path="/courses" element={<Courses title="Premium Courses" />} />
            <Route exact path="/courses/:slug" element={<Course />} />
            <Route exact path="/courseDashboard" element={<Dashboard />} />
            <Route exact path="/editCourse/:id" element={<AddCourse />} />
            <Route exact path="/updateCourse/:urlCourseSlug" element={<UpdateCourse />} />
            {/* Course - End */}

            {/* Blog - Start */}
            <Route exact path="/blog" element={<Blog />} />
            <Route exact path="/blog/:blogSlug" element={<Blogpost />} />
            {/* Blog - End */}

            {/* Notes - Start */}
            <Route exact path="/notes" element={<Notes />} />
            <Route exact path="/notesEdit/:urlNotesSlug" element={<NotesEdit />} />
            <Route exact path="/addNotes/:notesSlug" element={<AddNotes />} />
            <Route exact path='/notesDashboard' element={<NotesDashboard />} />
            {/* Notes - End */}

            {/* Bookshelf - Start */}
            <Route exact path="/bookshelf" element={<Bookshelf />} />
            {/* Bookshelf - End */}

            {/* Contact Us Form -Start */}
            {/* <Route exact path="/contact" element={<Contact />} /> */}
            {/* Contact us form - End */}

          </Routes>
          <Testimonial />
          <Footer />
        </Router>
    </>
  );
}

export default App;
