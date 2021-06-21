import { find } from "./find";
import { create } from "./create";
import { get } from "./get";
import { update } from "./update";
import { remove } from "./remove";

export const task = {
    paths:{
        '/task':{
            ...find,
            ...create
        },
        '/task/{id}':{
            ...get,
            ...update,
            ...remove
        }
    }
}