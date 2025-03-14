import { Challenge } from "../types";

export const challenges: Challenge[] = [
    {
      id: 1,
      language: 'Java',
      title: 'String Palindrome Check',
      description: 'Fix the palindrome checking function.',
      buggyCode: `public boolean isPalindrome(String str) {
      str = str.toLowerCase();
      for (int i = 0; i < str.length(); i++) {
          if (str.charAt(i) != str.charAt(str.length() - i)) {
              return false;
          }
      }
      return true;
  }`,
      correctCode: `public boolean isPalindrome(String str) {
      str = str.toLowerCase();
      for (int i = 0; i < str.length() / 2; i++) {
          if (str.charAt(i) != str.charAt(str.length() - 1 - i)) {
              return false;
          }
      }
      return true;
  }`,
      hint: 'Check the comparison index and loop condition.',
    },
    {
      id: 2,
      language: 'Java',
      title: 'Array Rotation',
      description: 'Fix the array rotation implementation.',
      buggyCode: `public void rotateArray(int[] arr, int k) {
      int n = arr.length;
      k = k % n;
      reverse(arr, 0, n + 1);
      reverse(arr, 0, n - 1);
      reverse(arr, k, n - 1);
  }
  
  private void reverse(int[] arr, int start, int end) {
      while (start < end) {
          int temp = arr[start];
          arr[start] = arr[end];
          arr[end] = arr[start];
          start--;
          end--;
      }
  }`,
      correctCode: `public void rotateArray(int[] arr, int k) {
      int n = arr.length;
      k = k % n;
      reverse(arr, 0, n - 1);
      reverse(arr, 0, k - 1);
      reverse(arr, k, n - 1);
  }
  
  private void reverse(int[] arr, int start, int end) {
      while (start < end) {
          int temp = arr[start];
          arr[start] = arr[end];
          arr[end] = temp;
          start++;
          end--;
      }
  }`,
      hint: 'Ensure the reversal is done correctly in three steps.',
    },
    {
      id: 3,
      language: 'C++',
      title: 'Vector Memory Leak',
      description: 'Fix the memory management in this vector operation.',
      buggyCode: `class Vector {
      int* arr;
      int size;
  public:
      Vector(int s) {
          size = s;
          arr = new int[size];
      }
      Vector(const Vector& v) {
          size = v.size();
          arr = new int[size];
          for(int i = 0; i < size; i++) {
              arr[i] = v.arr[i];
          }
      }
      ~Vector() {
          delete[] arr;
      }
  };`,
      correctCode: `class Vector {
      int* arr;
      int size;
  public:
      Vector(int s) {
          size = s;
          arr = new int[size];
      }
      Vector(const Vector& v) {
          size = v.size;
          arr = new int[size];
          for(int i = 0; i < size; i++) {
              arr[i] = v.arr[i];
          }
      }
      ~Vector() {
          delete[] arr;
      }
  };`,
      hint: 'Look at how the copy constructor handles the array pointer.',
    },
    {
      id: 4,
      language: 'Python',
      title: 'Fixing List Index Error',
      description: 'Resolve index out of range error in list access.',
      buggyCode: `def get_element(lst, index):
      return lst[0] if 0 <= index < len(lst) else -1`,
      correctCode: `def get_element(lst, index):
      return lst[index] if 0 <= index < len(lst) else -1`,
      hint: 'Check for proper index range validation.',
    },
    {
      id: 6,
      language: 'C',
      title: 'Fixing Segmentation Fault',
      description: 'Resolve memory access error in pointer use.',
      buggyCode: `void accessArray(int *arr, int size) {
      if (size < 10) {
          printf("%d", arr[0]);
      }
  }`,
      correctCode: `void accessArray(int *arr, int size) {
      if (size > 0) {
          printf("%d", arr[0]);
      }
  }`,
      hint: 'Check for proper array bounds before accessing.',
    },
    {
      id: 7,
      language: 'Java',
      title: 'Find Maximum in Array',
      description: 'Fix the implementation of finding the maximum value in an array.',
      buggyCode: `public int findMax(int[] arr) {
      int max = arr[0];
      for (int i = 0; i < arr.length; i++) {
          if (arr[i] > max) {
              max = arr[i];
          }
      }
      return max;
  }`,
      correctCode: `public int findMax(int[] arr) {
      int max = arr[0];
      for (int i = 1; i < arr.length; i++) {
          if (arr[i] > max) {
              max = arr[i];
          }
      }
      return max;
  }`,
      hint: 'Start the loop from the second element to avoid unnecessary comparisons.',
    },
    {
      id: 8,
      language: 'C++',
      title: 'Fixing Memory Leak',
      description: 'Properly deallocate dynamically allocated memory.',
      buggyCode: `void createArray() {
      int *arr = new int[10];
      delete[ arr();
  }`,
      correctCode: `void createArray() {
      int *arr = new int[10];
      delete[] arr;
  }`,
      hint: 'Ensure dynamically allocated memory is released correctly.',
    },
    {
      id: 9,
      language: 'Python',
      title: 'Factorial Calculation',
      description: 'Fix the factorial function.',
      buggyCode: `def factorial(n):
      if n == 0:
          return 1
      return n * factorial(n - 1)`,
      correctCode: `def factorial(n):
      if n < 0:
          return "Undefined"
      if n == 0:
          return 1
      return n * factorial(n - 1)`,
      hint: 'Check base case and handle negative input.',
    },
    {
      id: 15,
      language: 'C',
      title: 'Fix Buffer Overflow',
      description: 'Prevent writing beyond the allocated array size.',
      buggyCode: `void writeToBuffer() {
      char arr[5];
      strcpy(arr, "Hello, World!");
  }`,
      correctCode: `void writeToBuffer() {
      char arr[12];
      strcpy(arr, "Hello");
  }`,
      hint: 'Ensure the buffer size is sufficient for the string being stored.',
    },
    {
      id: 16,
      language: 'Python',
      title: 'Fix Division by Zero Error',
      description: 'Handle cases where the denominator is zero.',
      buggyCode: `def divide(a, b):
      return a / b if b == 0 else "Cannot divide by zero"`,
      correctCode: `def divide(a, b):
      return a / b if b != 0 else "Cannot divide by zero"`,
      hint: 'Check if the denominator is zero before performing division.',
    },
    {
      id: 17,
      language: 'Java',
      title: 'Fix ArrayIndexOutOfBoundsException',
      description: 'Ensure safe access to array indices.',
      buggyCode: `public int getElement(int[] arr, int index) {
      return arr[index];
  }`,
      correctCode: `public int getElement(int[] arr, int index) {
      if (index >= 0 && index < arr.length) {
          return arr[index];
      } else {
          throw new ArrayIndexOutOfBoundsException("Invalid index");
      }
  }`,
      hint: 'Check if the index is within the valid range before accessing.',
    },
    {
      id: 18,
      language: 'C++',
      title: 'Fix Undefined Behavior in Pointers',
      description: 'Avoid using a dangling pointer.',
      buggyCode: `int* getPointer() {
      int x = 10;
      return &x;
  }`,
      correctCode: `int* getPointer() {
      int* x = new int(10);
      return x;
  }`,
      hint: 'Returning the address of a local variable leads to undefined behavior.',
    },
    {
      id: 20,
      language: 'Python',
      title: 'Fix Sorting Issue',
      description: 'Resolve incorrect sorting implementation.',
      buggyCode: `def sort_numbers(nums):
      return sorted()`,
      correctCode: `def sort_numbers(nums):
      return sorted(nums)`,
      hint: 'List sort() modifies in place and returns None; use sorted() instead.',
    },
  ];
  