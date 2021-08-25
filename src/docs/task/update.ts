export const update = {
    put:{
        tags:['Task'],
        summary: "Update task",
        description: "Update task",
        operationId: "updateTask",
        parameters:[
            {
                name:"id",
                in:"path",
                schema:{
                    $ref:"#/components/schemas/id"
                },
                required:true,
                description: "ID"
            }
        ],
        requestBody: {
            content:{
                'application/json': {
                    schema:{
                        $ref:'#/components/schemas/TaskUpdate'
                    }
                }
            }
        },
        responses:{

            '200':{
                description: "Task updated successfully"
            },
            '404':{
                description: "Task not found"
            },
            '500':{
                description: "Server error"
            }

        }
    }
}