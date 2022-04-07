import {Location} from "react-router-dom";

export interface ILocationState extends Location {
    state: {
        from?: {
            hash: string
            key: string
            pathname: string
            search: string
            state: null | string
        }
    }
}
