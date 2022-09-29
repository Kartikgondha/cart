import * as ActionTypes from '../Actiontypes'
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";

import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '../../Firebase';


export const getCategory = () => async (dispatch) => {
    try {
        const querySnapshot = await getDocs(collection(db, "category"));
        let data = [];
        querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() })
        });
        dispatch({ type: ActionTypes.GET_CATEGORY, payload: data })
    } catch (error) {
        dispatch(errorcatrgory(error.message));
    }
}
export const addCategory = (data) => async (dispatch) => {
    console.log(data);
    try {
        let Filename = Math.floor(Math.random() * 100000000).toString();

        const docRef = ref(storage, 'category/' + Filename)
        uploadBytes(docRef, data.category_img)
            .then(async (snapshot) => {
                getDownloadURL(snapshot.ref)
                    .then(async (url) => {
                        const docRef = await addDoc(collection(db, "category"), { ...data, category_img: url, Filename: Filename });
                        dispatch({ type: ActionTypes.ADD_CATEGORY, payload: { id: docRef.id, ...data, category_img: url, Filename: Filename } })
                    });
            });
    } catch (error) {
        dispatch(errorcatrgory(error.message));
    }
}


export const deleteCategory = (data) => async (dispatch) => {
    try {
        const docRef = ref(storage, 'category/' + data.Filename);
        deleteObject(docRef).then(async () => {
            await deleteDoc(doc(db, "category", data.id));
            dispatch({ type: ActionTypes.DELETE_CATEGORY, payload: data.id })
        }).catch((error) => {
            dispatch(errorcatrgory(error.message));
        });
    } catch (error) {
        dispatch(errorcatrgory(error.message));
    }
}



export const updateCategory = (data) => async (dispatch) => {
    console.log(data);
    try {
        const docRef = doc(db, "category", data.id);

        if (typeof data.category_img === "string") {
            await updateDoc(docRef, {
                name: data.name,
                category_img: data.category_img,
                Filename: data.Filename
            });
            dispatch({ type: ActionTypes.UPDATE_CATEGORY, payload: data })
        } else {
            //1
            let Filename = Math.floor(Math.random() * 100000000).toString();
            const docRefDel = ref(storage, 'category/' + data.Filename);
            const docRefIns = ref(storage, 'category/' + Filename)

            deleteObject(docRefDel)
                .then(async () => {
                    uploadBytes(docRefIns, data.category_img)
                        .then(async (snapshot) => {
                            getDownloadURL(snapshot.ref)
                                .then(async (url) => {

                                    await updateDoc(docRef, {
                                        name: data.name,
                                        category_img: url,
                                        Filename: Filename
                                    });
                                    dispatch({ type: ActionTypes.UPDATE_CATEGORY, payload: { ...data, category_img: url, Filename: Filename } })
                                })
                        })
                })

        }


    } catch (error) {
        dispatch(errorcatrgory(error.message));
    }
}



export const errorcatrgory = (error) => (dispatch) => {
    dispatch({ type: ActionTypes.ERROR_CATEGORY, payload: error })
}