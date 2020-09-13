import sys
class EightQueensProblem:
	''' PROBLEM DEFINITION:
	Initial state: Given board configuration represented as an 8-tuple
				   tuple(row) = column
	Value (objective function): number of conflicting (attacking) queens in the state
	Actions: move each queen in a row to a different column in the same row
	'''

	def __init__(self, initial):
		self.initial = initial

	def actions(self, state):
		act = []
		for i in range(0, 8):
			act.append('Mov_queen_%s' % i)
		return act

	# Checks whether two queens are conflicting
	def conflict(self, row1, col1, row2, col2):
		return (row1 == row2 or
		col1 == col2 or
		row1 - col1 == row2 - col2 or
		row1 + col1 == row2 + col2)

	# Computes the objective function value for a given state
	def value(self, state):
		num_conflicts = 0
		for (c1, r1) in enumerate(state):
			for (c2, r2) in enumerate(state):
				if (c1, r1) != (c2, r2):
					num_conflicts += self.conflict(r1, c1, r2, c2)
		return num_conflicts

class Node:

	def __init__(self, state):
		self.state = state

	# Returns children nodes
	def next_states(self, problem):
		children = []
		for action in problem.actions(self.state):
			to_mov = int(action[-1])
			for i in range(0, 8):
				temp = list(self.state)
				if temp[to_mov] != i:
					temp[to_mov] = i
					children.append(Node(tuple(temp)))
		return children

# Performs a local search
def hillClimbSearch(problem):

	node = Node(problem.initial)
	sequence = [node.state]

	while True:
		neighbours = node.next_states(problem)
		least_neighbour = min(neighbours, key = lambda node: problem.value(node.state))
		if problem.value(least_neighbour.state) >= problem.value(node.state):
			break
		node = least_neighbour
		sequence.append(node.state)

	return sequence, node.state, problem.value(node.state)//2

# Function that prints the data that nodeJS requires
def toNodeJs(arr, minObjFunc):
	temp = list(arr[0])
	for i in range(8):
		temp[i] = 8*i + int(temp[i])
	out = list(map(str, temp))
	for i in range(1, len(arr)):
		for j in range(8):
			if(arr[i][j] != arr[i-1][j]):
				out.append(str(8*j+arr[i][j]))
	out.append(str(minObjFunc))
	print(','.join(out),end=",")

# MAIN -
inp = list(map(int, sys.argv[1].split(",")))
temp = [0 for i in range(8)]


for ele in inp:
	temp[ele//8] = ele%8
start = tuple(temp)

eight_queens = EightQueensProblem(start)
seq, final, minVal = list(hillClimbSearch(eight_queens))

toNodeJs(seq, minVal)
sys.stdout.flush()