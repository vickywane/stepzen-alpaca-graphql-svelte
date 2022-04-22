export const GET_ORDERS = ``

export const GET_ACCOUNT_DETAILS = `
    query accountDetail {
        AccountQuery {
            id
            cash
            account_number
            buying_power
            equity
            account_number
            created_at
            currency
        }
    }   
`

export const GET_ACCOUNT_ORDERS = `
query getOrders($orderStatus: String) {
    OrdersQuery(status: $orderStatus) {
        id
        symbol
        client_order_id
        asset_id
        asset_class
        side
        created_at
        qty
        type
        updated_at
        status
        order_type
    }
} 
`

export const CREATE_STOCK_ORDER = `
    mutation createOrder($symbol: String, $qty: Int, $time_in_force: String, $type: String, $side: String ) {
        CreateOrder(
            symbol: $symbol
            qty: $qty
            time_in_force: $time_in_force
            type: $type
            side: $side
        ) {
            id
        }
    }  
`