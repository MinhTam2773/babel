import {Button, Box} from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LibraryPage from "./pages/LibraryPage";
import Navbar from "./components/Navbar";
import { useColorModeValue } from "@chakra-ui/react";
import CreatePage from "./pages/CreatePage";
import AboutPage from "./pages/AboutPage";
import Footer from "./components/Footer";
import BookPage from "./pages/BookPage";
import ResultPage from "./pages/ResultPage";

function App() {

  return (
    <>
      <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/:id" element={<BookPage />} />
          <Route path="/search" element={<ResultPage/>} />
        </Routes>
        <Footer />
      </Box>
    </>
  );
}

export default App;
