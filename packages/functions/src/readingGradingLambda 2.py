
dynamodb = resource('dynamodb')

def calculate_score(answer, correct_answers):
    # Compare the student's answer with each correct answer
    for correct_answer in correct_answers:
        if answer == correct_answer:
            return 1
    return 0

def get_correct_answers(exam_id, question_id):
    table = dynamodb.Table('MyReadingQuestionsTable')
    response = table.get_item(
        Key={
            'examId': exam_id,
            'questionId': question_id
        }
    )
    item = response.get('Item', {})
    return item.get('correctAnswer', [])

def get_next_response_id():
    table = dynamodb.Table('MyReadingResponsesTable')
    response = table.update_item(
        Key={
            'id': 'responseCounter'
        },
        UpdateExpression='SET counter = counter + :increment',
        ExpressionAttributeValues={
            ':increment': 1
        },
        ReturnValues='UPDATED_NEW'
    )
    return response.get('Attributes', {}).get('counter')

def store_student_response(exam_id, question_id, student_answer, score):
    response_id = get_next_response_id()
    table = dynamodb.Table('MyReadingResponsesTable')
    table.put_item(
        Item={
            'responseID': response_id,
            'examId': exam_id,
            'questionId': question_id,
            'studentAnswer': student_answer,
            'score': score
        }
    )

def lambda_handler(event, context):
    # Retrieve the answer, exam ID, and question ID from the request body
    request_body = json.loads(event['body'])
    answer = request_body.get('studentAnswer', '')
    exam_id = request_body.get('examID', '')
    question_id = request_body.get('questionID', '')

    # Retrieve the correct answers from the DynamoDB table
    correct_answers = get_correct_answers(exam_id, question_id)

    # Calculate the score for the answer and store the response in DynamoDB
    score = calculate_score(answer, correct_answers)
    store_student_response(exam_id, question_id, answer, score)

    response_body = {
        'message': 'Success',
        'examID': exam_id,
        'questionID': question_id,
        'studentAnswer': answer,
        'score': score
    }


    return {
        'statusCode': 200,
        'body': json.dumps(response_body)
    }