export const remove = {
    delete:{
        tags: ['Task'],
        summary: "Delete task",
        description: "Deleting a task",
        operationId: "deleteTask",
        parameters:[
            {
                name:"id",
                in:"path",
                schema:{
                    $ref:"#/components/schemas/id"
                },
                required:true,
                description: "Delete task"
            }
        ],
        responses:{
            '204':{
                description:"Task deleted successfully"
            },
            '404':{
                description:"Task not found"
            },
            '500':{
                description:"Server error"
            }
        }
    }
}