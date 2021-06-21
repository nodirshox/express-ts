import { basicInfo } from "./basic";
import { servers } from "./servers";
import { components } from "./components";
import { tags } from "./tags";
import { task } from "./task";

export const docs = {
    ...basicInfo,
    ...servers,
    ...components,
    ...tags,
    ...task
}