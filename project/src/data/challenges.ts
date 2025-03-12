import { Challenge } from '../types';

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
    id: 4,
    language: 'Python',
    title: 'Fixing List Index Error',
    description: 'Resolve index out of range error in list access.',
    buggyCode: `def get_element(lst, index):
    return lst[index] if index else -1`,
    correctCode: `def get_element(lst, index):
    return lst[index] if 0 <= index < len(lst) else -1`,
    hint: 'Check for proper index range validation.',
  },
  {
    id: 5,
    language: 'JavaScript',
    title: 'Fixing Async/Await Issue',
    description: 'Resolve incorrect use of async/await.',
    buggyCode: `async function fetchData() {
    let response = fetch('https://api.example.com/data');
    let data = await response.json();
    return data;
}`,
    correctCode: `async function fetchData() {
    let response = await fetch('https://api.example.com/data');
    let data = await response.json();
    return data;
}`,
    hint: 'Ensure await is used with fetch.',
  },
  {
    id: 6,
    language: 'C',
    title: 'Fixing Segmentation Fault',
    description: 'Resolve memory access error in pointer use.',
    buggyCode: `void accessArray(int *arr) {
    printf("%d", arr[10]);
}`,
    correctCode: `void accessArray(int *arr, int size) {
    if (size > 10) {
        printf("%d", arr[10]);
    }
}`,
    hint: 'Check for proper array bounds before accessing.',
  },
  {
    id: 7,
    language: 'Java',
    title: 'Fixing Null Pointer Exception',
    description: 'Avoid NullPointerException in Java.',
    buggyCode: `public void printLength(String str) {
    System.out.println(str.length());
}`,
    correctCode: `public void printLength(String str) {
    if (str != null) {
        System.out.println(str.length());
    }
}`,
    hint: 'Check for null before accessing object properties.',
  },
  {
    id: 8,
    language: 'C++',
    title: 'Fixing Memory Leak',
    description: 'Properly deallocate dynamically allocated memory.',
    buggyCode: `void createArray() {
    int *arr = new int[10];
}`,
    correctCode: `void createArray() {
    int *arr = new int[10];
    delete[] arr;
}`,
    hint: 'Ensure dynamically allocated memory is released.',
  }
];
