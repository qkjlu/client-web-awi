import React from 'react';
import { connect } from 'react-redux';
import {
    getPropositionById, getUserById,
    getSliceById,
    getSelectedProposition,
    getCurrentUserId,
    isCurrentUserAdmin
} from "../../redux/selectors/selectors";
import { ENTITIES } from "../../redux/schema";
import './Proposition.css'
import { selectProposition } from 'redux/slices/propositions'
import Like from '../like/Like'
import Delete from '../delete/Delete'
import { Tags } from 'components/tags/Tags';

function Proposition(props) {
    const { id, title, content, isAnon } = props.proposition;
    const owner = props.owner;
    const tags = props.tags;
    const selectedProp = props.selectedProp;

    return (
        <div className={selectedProp === id ? "proposition selected" : "proposition"} onClick={() => props.selectProposition(id)}>
            <div className="proposition-title">{title} <a href="" className='proposition-owner'>
                {!isAnon && <> @{owner.name} </>}
                {isAnon && <> @anon </>}
            </a></div>
            <p className="proposition-content">{content}</p>
            <Tags ids={tags}/>
            <Like id={id} type='proposition'/>
            {(props.currentUser && props.currentUser  === props.owner.id || props.isAdmin) && <Delete id={props.id} type='proposition' />}
        </div>

    )
}

const mapStateToProps = (state, ownProp) => {
    const proposition = getPropositionById(state, ownProp.id);
    const owner = getUserById(state, proposition.owner);
    const tags = proposition.tags;
    const selectedProp = getSelectedProposition(state);
    const currentUser = getCurrentUserId(state);
    const isAdmin = isCurrentUserAdmin(state);
    return { proposition, owner, tags, selectedProp, currentUser, isAdmin }
}

export default connect(mapStateToProps, { selectProposition })(Proposition)
