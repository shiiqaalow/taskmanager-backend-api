export const validate = (schema) => (req,res,next) => {
    const result = schema.safeParse(req.body)
    if(!result.success){
        const formatted = result.error.format()
        console.log('Formatted:',Object.keys(formatted))
        return res.status(401).json({
            succes: false,
            message:'Invalid validation',
            error: Object.keys(formatted)
                .filter(field => field !== '_errors')
                .map(field => ({
                    field,
                    message: formatted[field]._errors[0]
                }))
        })
    }
    next()
}