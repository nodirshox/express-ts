export const components = {
    components:{
        schemas:{
            id:{
                type:'string',
                example: "string"
            },
            Task:{
                type:'object',
                properties:{
                    _id:{
                        type:'string',
                        example:"string"
                    },
                    title:{
                        type:'string',
                        example:"string"
                    },
                    author:{
                        type:'string',
                        example:"string"
                    },
                    is_active:{
                        type:"boolean",
                        example:true
                    },
                    created_at:{
                        type:'string',
                        example:"string"
                    },
                    updated_at:{
                        type:'string',
                        example:"string"
                    },
                }
            },
            TaskCreate:{
                type:'object',
                properties:{
                    title:{
                        type:'string',
                        example:"string"
                    },
                    author:{
                        type: 'string',
                        example: 'string'
                    }
                }
            },
            TaskUpdate:{
                type:'object',
                properties:{
                    title:{
                        type:'string',
                        example:"string"
                    },
                    author:{
                        type: 'string',
                        example: 'string'
                    },
                    is_active:{
                        type:"boolean",
                        example:true
                    }
                }
            },
            Error:{
                type:'object',
                properties:{
                    error:{
                        type:'string'
                    }
                }
            }
        },
        securitySchemes: {
            ApiKeyAuth: {
              type: "apiKey",
              name: "Authorization",
              in: "header"
            }
        },
    }
}