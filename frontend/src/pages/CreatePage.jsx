import { Container, VStack, Heading, Box, Input, Button, useColorModeValue, useToast, Image, IconButton, Select } from '@chakra-ui/react';
import { useState, useRef } from 'react';
import { useBookStore } from '../store/book';
import { FiUpload, FiX } from 'react-icons/fi';

const CreatePage = () => {
  const [newBook, setNewBook] = useState({
    name: "",
    price: "",
    author: "",
    category: "",
    image: "", // Added to maintain consistent state structure
  });
  const categories = ["Fiction", "Non-Fiction", "Science", "Biography", "History"];
  const [preview, setPreview] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const inputRef = useRef(null);
  const toast = useToast();
  const { createBook } = useBookStore();

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.match('image/jpeg|image/png|image/jpg')) {
      toast({
        title: "Invalid file type",
        description: "Please upload a JPEG or PNG image",
        status: "error",
        duration: 5000,
      });
      return;
    }

    // Validate file size (e.g., 5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Maximum size is 5MB",
        status: "error",
        duration: 5000,
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setPreview("");
    setNewBook(prev => ({...prev, image: ""}));
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleAddBook = async () => {
    if (!preview) {
      toast({
        title: "Error",
        description: "Please upload a book cover image",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (!newBook.name || !newBook.price) {
      toast({
        title: "Error",
        description: "Please fill all fields",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setIsUploading(true);

    try {
      // 1. Upload to Cloudinary
      const formData = new FormData();
      formData.append('file', inputRef.current.files[0]);
      formData.append('upload_preset', 'book_uploads');

        // No API key needed here when using unsigned preset
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dcoofi7ic/image/upload`,
        { method: 'POST', body: formData }
      );

      const imageData = await response.json(); 

      if (!imageData.secure_url) {
        throw new Error(imageData.error?.message || "Cloudinary upload failed");
      }

      // 2. Create book with the Cloudinary URL
      const { success, message } = await createBook({
        ...newBook,
        image: imageData.secure_url
      });

      toast({
        title: success ? "Success" : "Error",
        description: "Còn code còn khổ",
        status: success ? "success" : "error",
        duration: 5000,
        isClosable: true,
      });

      // 3. Reset form if successful
      if (success) {
        setNewBook({ name: "", price: "", image: "" , category: "", author: "" });
        setPreview("");
        if (inputRef.current) inputRef.current.value = "";
      }
    } catch (error) {
      toast({
        title: "Upload Failed",
        description:  error.message ,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Container maxW="container.xl" py={12} pt={20}>
      <VStack spacing={6}>
        <Heading>Add New Book</Heading>
        <Box
          w="full"
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded="lg"
          shadow="md"
        >
          <VStack spacing={4}>
            <Input
              placeholder="Book Title"
              value={newBook.name}
              onChange={(e) => setNewBook({...newBook, name: e.target.value})}
              isRequired
            />

            <Input
              placeholder="Author"
              value={newBook.author}
              onChange={(e) => setNewBook({...newBook, author: e.target.value})}
              isRequired
            />

            <Input
              placeholder="Price"
              type="number"
              value={newBook.price}
              onChange={(e) => setNewBook({...newBook, price: e.target.value})}
              isRequired
            />

            <Select
              value={newBook.category}
              onChange={(e) => setNewBook({...newBook, category: e.target.value})}
              isRequired
            >
                <option value="" disabled>Select Category</option>
              { categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              )) }
            </Select>

            {/* Image Upload Section */}
            <Box w="full">
              <input
                type="file"
                // accept="image/jpeg, image/png"
                onChange={handleImageChange}
                ref={inputRef}
                id="image-upload"
                hidden
              />
              <Button
                as="label"
                htmlFor="image-upload"
                leftIcon={<FiUpload />}
                w="full"
                cursor="pointer"
                variant="outline"
              >
                {preview ? "Change Image" : "Upload Cover"}
              </Button>

              {preview && (
                <Box mt={4} display="flex" alignContent={"center"}>
                  <Image
                    src={preview}
                    alt="Book cover preview"
                    borderRadius="md"
                    h={60} w={60} objectFit='cover'
                  />
                  <IconButton
                    aria-label="Remove image"
                    icon={<FiX />}
                    size="sm"
                    // position="absolute"
                    // top={2}
                    // right={}
                    onClick={handleRemoveImage}
                    colorScheme="red"
                  />
                </Box>
              )}
            </Box>

            <Button
              colorScheme="blue"
              onClick={handleAddBook}
              w="25%"
              isLoading={isUploading}
              loadingText="Publishing..."
              isDisabled={!newBook.name || !newBook.price || !preview || !newBook.category}
            >
              Add Book
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;