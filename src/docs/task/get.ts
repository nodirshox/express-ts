export const get = {
    get:{
        tags:['Task'],
        summary: "Get task",
        description: "Get task",
        operationId: "getTask",
        parameters:[
            {
                name:"id",
                in:"path",
                schema:{
                    $ref:"#/components/schemas/id"
                },
                required:true,
                description: "A single task"
            }
        ],
        responses:{
            '200':{
                description:"Task is obtained",
                content:{
                    'application/json':{
                        schema:{
                            $ref:"#/components/schemas/Task"
                        }
                    }
                }
            },
            '404':{
                description: "Task is not found",
                content:{
                    'application/json':{
                        schema:{
                            $ref:'#/components/schemas/Error',
                            example:{
                                message:"We can't find the todo",
                                internal_code:"Invalid id"
                            }
                        }
                    }
                }
            }
        }
    }
}