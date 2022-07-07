import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { Store } from "../store/store";

export const useTypedSelector: TypedUseSelectorHook<Store> = useSelector;
