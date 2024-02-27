import React, { useState, useRef } from 'react'
import "./DropDownComponent.scss"
import { useClickOutside } from '../../hooks/useClickOutSide'
import { NavLink } from "react-router-dom";
import { actions } from '../../Features/slices/NavigationId.slice'
import { actions as secondAction } from '../../Features/slices/SecondNavigationId.slice'
import { actions as SetIndexAction } from '../../Features/slices/SetIndexNavItem.slice'
import { useDispatch } from 'react-redux'
import transliterateToURL from '../../layouts/TransliteToUrl';

export const DropDown = ({info, index}) => {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const {firstList, catalog,img, arrowCatalog,id} = info
    const menuRef = useRef()
    useClickOutside(menuRef, () => {
        setOpen(false);
    })
    if (index === 5) {
        return (
            <>
                <div>
                    <li className="nav_item">
                        <a href='#' style={{color: "#F79009"}}>{catalog}</a>
                    </li>
                </div>
                <div></div>
            </>
        )
    }
    return(
        <>
            <div>
                <li className="nav_item" onClick={() => setOpen(!open)}>
                    <a href='#' style={index === 5 ? {color: "#F79009"} : null} onClick={(e) => {
                        dispatch(actions.setNavItem(e.target.innerText))
                        dispatch(SetIndexAction.SetIndexNavItem(index))
                        }}>{catalog}</a>
                </li>
            </div>
            <div className={open ? 'modal active' : "modal"}>
                <div className={open ? "catalog_pc active": "catalog_pc"}>
                    <div className='container_modal' ref={menuRef}>
                        <div className="modal_list">
                            <ul className='item_list'>
                                {
                                    firstList.map((item,index) => {
                                        if (firstList.length - 1 === index)  return <li key={id}><NavLink className="links_drop_menu_last" onClick={() => {
                                        setOpen(false)
                                        dispatch(secondAction.setSecondNavItem(""))}
                                        } to={`/catalog/${id}`}>{item}</NavLink><img src={arrowCatalog} alt='arrowCatalog' /></li>
                                    return <li onClick={() => setOpen(false)}><NavLink className="links_drop_menu" onClick={(e) => dispatch(secondAction.setSecondNavItem(e.target.innerText))} to={`/catalog/${id}/${transliterateToURL(item)}`}>{item}</NavLink></li> 
                                    })
                                }
                            </ul>
                        </div>
                        <img src={img} alt=''/>
                    </div>
                </div>
                <div className={open ? "background_click active" : "background_click"} onClick={() => {setOpen(false)}}>
                </div>
            </div>
        </>
    )
}