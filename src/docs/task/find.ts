export const find = {
    get:{
        tags: ['Task'],
        summary: "Find tasks",
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