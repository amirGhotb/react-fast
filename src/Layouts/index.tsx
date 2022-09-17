import {Public} from "./Pubilc";

export default function (children: JSX.Element): { [key: string]: JSX.Element } {
    return {
        public: Public(children),
    }
}
