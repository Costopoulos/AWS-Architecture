import json
import boto3

s3 = boto3.client("s3")
BUCKET_NAME = 'metaversekickoffcosto';
SUBFOLDER = 'StreamingAssets';

def lambda_handler(event, context):
    print(f'event is {event}')
    FOLDER_TO_DELETE_FROM = event['pathParameters']['folder']
    FILE_TO_DELETE = event['pathParameters']['file']
    FILE_TO_DELETE = f'{SUBFOLDER}/{FOLDER_TO_DELETE_FROM}/{FILE_TO_DELETE}'
    
    # Check if the file exists
    try:
        s3.head_object(Bucket=BUCKET_NAME, Key=FILE_TO_DELETE)
    except Exception as e:
        if e.response['ResponseMetadata']['HTTPStatusCode'] == 404:
            # File not found
            return {
                'statusCode': 404,
                'body': json.dumps({'Message': 'File not found'})
            }
        else:
            # Other error occurred
            return {
                'statusCode': 500,
                'body': json.dumps({'Message': 'Error occurred while checking file existence'})
            }
    
    # File exists, proceed with deletion
    try:
        s3.delete_object(Bucket=BUCKET_NAME, Key=FILE_TO_DELETE)
        return {
            'statusCode': 200,
            'body': json.dumps({'Message': 'File deleted successfully'})
        }
    except Exception as e:
        print(f"Error deleting file: {str(e)}")
        return {
            'statusCode': 500,
            'body': json.dumps({'Message': 'Error deleting file'})
        }
