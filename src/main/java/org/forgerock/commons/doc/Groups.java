/*
 * The contents of this file are subject to the terms of the Common Development and
 * Distribution License (the License). You may not use this file except in compliance with the
 * License.
 *
 * You can obtain a copy of the License at legal/CDDLv1.0.txt. See the License for the
 * specific language governing permission and limitations under the License.
 *
 * When distributing Covered Software, include this CDDL Header Notice in each file and include
 * the License file at legal/CDDLv1.0.txt. If applicable, add the following below the CDDL
 * Header, with the fields enclosed by brackets [] replaced by your own identifying
 * information: "Portions Copyrighted [year] [name of copyright owner]".
 *
 * Copyright 2014 ForgeRock AS
 */

package org.forgerock.commons.doc;

/**
 * Groups object corresponding to a JSON array of group resources.
 */
public class Groups {
    private Group[] groups;

    /**
     * Construct a Groups object from a JSON array of group objects.
     *
     * @param groups Array of Group objects
     */
    public Groups(Group[] groups) {
        this.groups = groups;
    }

    /**
     * Get the array of Groups held by this object.
     * @return The array of Groups held by this object.
     */
    public Group[] getGroups() {
        return this.groups;
    }
}
