import { Challenge } from '../types';

export const challenges: { [key: string]: Challenge[] } = {
  'Java': [
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
      hint: 'Check the comparison index and loop condition',
    },
    {
      id: 2,
      language: 'Java',
      title: 'Array Rotation',
      description: 'Fix the array rotation implementation.',
      buggyCode: `public void rotateArray(int[] arr, int k) {
    int n = arr.length;
    for(int i = 0; i < k; i++) {
        for(int j = 0; j < n; j++) {
            int temp = arr[j];
            arr[j] = arr[(j + 1) % n];
            arr[(j + 1) % n] = temp;
        }
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
      hint: 'Consider using array reversal technique instead of element-by-element rotation',
    }
  ],
  'C++': [
    {
      id: 1,
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
        size = v.size;
        arr = v.arr;
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
      hint: 'Look at how the copy constructor handles the array pointer',
    },
    {
      id: 2,
      language: 'C++',
      title: 'Template Function Error',
      description: 'Fix the template function to work with different types.',
      buggyCode: `template<typename T>
T findMax(T arr[], int size) {
    T max = arr[0];
    for(int i = 0; i <= size; i++) {
        if(arr[i] > max)
            max = arr[i];
    }
    return max;
}`,
      correctCode: `template<typename T>
T findMax(T arr[], int size) {
    if(size == 0) return T();
    T max = arr[0];
    for(int i = 1; i < size; i++) {
        if(arr[i] > max)
            max = arr[i];
    }
    return max;
}`,
      hint: 'Check the loop bounds and consider edge cases',
    }
  ],
  'C': [
    {
      id: 1,
      language: 'C',
      title: 'Binary Search Error',
      description: 'Fix the binary search implementation.',
      buggyCode: `int binarySearch(int arr[], int size, int target) {
    int left = 0;
    int right = size;
    
    while (left <= right) {
        int mid = (left + right) / 2;
        if (arr[mid] == target)
            return mid;
        if (arr[mid] < target)
            left = mid;
        else
            right = mid;
    }
    return -1;
}`,
      correctCode: `int binarySearch(int arr[], int size, int target) {
    int left = 0;
    int right = size - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target)
            return mid;
        if (arr[mid] < target)
            left = mid + 1;
        else
            right = mid - 1;
    }
    return -1;
}`,
      hint: 'Look at how the search range is updated and check for integer overflow',
    },
    {
      id: 2,
      language: 'C',
      title: 'Buffer Overflow',
      description: 'Fix the string copying function to prevent buffer overflow.',
      buggyCode: `void copyString(char* dest, char* src) {
    while(*src) {
        *dest = *src;
        src++;
        dest++;
    }
    *dest = '\\0';
}`,
      correctCode: `void copyString(char* dest, char* src, size_t destSize) {
    if(dest == NULL || src == NULL || destSize == 0)
        return;
    
    size_t i;
    for(i = 0; i < destSize - 1 && src[i] != '\\0'; i++) {
        dest[i] = src[i];
    }
    dest[i] = '\\0';
}`,
      hint: 'Consider buffer size limits and null termination',
    }
  ],
  'Python': [
    {
      id: 1,
      language: 'Python',
      title: 'List Comprehension Bug',
      description: 'Fix the list comprehension to filter even numbers correctly.',
      buggyCode: `def get_even_numbers(numbers):
    return [x for x in numbers if x % 2]`,
      correctCode: `def get_even_numbers(numbers):
    return [x for x in numbers if x % 2 == 0]`,
      hint: 'Check the condition in the list comprehension',
    },
    {
      id: 2,
      language: 'Python',
      title: 'Generator Function Issue',
      description: 'Fix the Fibonacci generator function.',
      buggyCode: `def fibonacci_generator():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b
        if a > 100:
            return`,
      correctCode: `def fibonacci_generator():
    a, b = 0, 1
    while True:
        yield a
        if a > 100:
            break
        a, b = b, a + b`,
      hint: 'Look at the placement of the termination condition',
    }
  ]
};