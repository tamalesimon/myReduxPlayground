const createPolicy = (name, amount) => {
    return {
        type: 'CREATE_POLICY',
        payload: {
            name: name,
            amount: amount
        }
    };
};

const deletePolicy = (name) => {
    return {
        type: 'DELETE_POLICY',
        payload: {
            name: name
        }
    };
};

const claimPolicy = (name, amountToClaim) => {
    return {
        type: 'CREATE_CLAIM',
        payload: {
            name: name,
            amount: amountToClaim
        }
    };
};

//Reducers 

const claimsReducer = (oldListOfClaims = [], action) => {
    if (action.type === 'CREATE_CLAIM') {
        return [...oldListOfClaims, action.payload];
    }
    return oldListOfClaims;
};

const accountingReducer = (bagOfMoney = 100, action) => {
    if (action.type === 'CREATE_CLAIM') {
        return bagOfMoney - action.payload.amountToClaim; 
    } else if (action.type === 'CREATE_POLICY') {
        return bagOfMoney + action.payload.amount;
    } 
    return bagOfMoney;
};

const policyReducer = (listOfPolicies = [], action) => {
    if (action.type === 'CREATE_POLICY') {
        return [...listOfPolicies, action.payload.name];
    } else if (action.type === 'DELETE_policy') {
        return listOfPolicies.filter(name => name !== action.payload.name);
    }
    return listOfPolicies; 
};

const { createStore, combineReducers } = Redux;

const ourDepartments = combineReducers({
    accountingReducer: accountingReducer,
    claimsReducer: claimsReducer,
    policyReducer: policyReducer
});

const store = createStore(ourDepartments);

