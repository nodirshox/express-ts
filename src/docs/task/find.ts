export const find = {
    get:{
        tags: ['Task'],
        description: "Find tasks",
        operationId: 'findTasks',
        parameters: [] as string[],
        responses:{
            '200':{
                description:"Find tasks",
                content:{
                    'application/json':{
                        schema:{
                            $ref:'#/components/schemas/Task'
                        }
                    }
                }
            }
        }
    }
}