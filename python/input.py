# 입력값 다루기

"""
input
4 5
output
a = 4
b = 5
""" 
str = input().strip().split()
a, b = map(int, str)
print(f"a={a}\nb={b}")