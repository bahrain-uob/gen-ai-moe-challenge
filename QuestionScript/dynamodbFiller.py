import boto3
import uuid
import json

client = boto3.client('dynamodb', region_name='us-east-1')

TransactItemss = [] # List of items to be added to the table
indexes = {} # Dictionary to store the indexes of the questions which contains the list of sort keys of the questions for each type
TableName = 'Bilal-codecatalyst-sst-app-Records'   # Channge the table name
QuestionTypes = ["WritingP1", "WritingP2", "ReadingP1", "ReadingP2", "ReadingP3", "ListeningP1",
                 "ListeningP2", "ListeningP3", "ListeningP4", "SpeakingP1", "SpeakingP2P3","vocabA1","vocabA2","vocabB1",
                 "vocabB2","vocabC1","vocabC2"]

questions = json.loads(open("./questions.json", "r", encoding="utf8").read())

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
