import boto3
import uuid
import json

client = boto3.client('dynamodb', region_name='us-east-1')

TransactItemss = [] # List of items to be added to the table
indexes = {} # Dictionary to store the indexes of the questions which contains the list of sort keys of the questions for each type
TableName = 'prod-codecatalyst-sst-app-Records'   # Channge the table name
QuestionTypes = ["writing", "reading", "listening", "speaking"]

questions = json.loads(open("./questionsNew.json", "r", encoding="utf8").read())

for type in QuestionTypes:
    indexes[type] = []
    for question in questions[type]:
        id = str(uuid.uuid4())
        TransactItemss.append({
            'Put': {
                'TableName': TableName,
                'Item': {
                    'PK': {'S': str(type)},
                    'SK': {'S': id },
                    **question
                }
            }
        })
        indexes[type].append({'S': id}) 
    

for type in indexes:
    TransactItemss.append({
        'Put': {
            'TableName': TableName,
            'Item': {
                'PK': {'S': str(type)},
                'SK': {'S': 'index'},
                'index': {'L': indexes[type]}
          }
        }
    })
    
response = client.transact_write_items(
    TransactItems=TransactItemss
)
print(response)
