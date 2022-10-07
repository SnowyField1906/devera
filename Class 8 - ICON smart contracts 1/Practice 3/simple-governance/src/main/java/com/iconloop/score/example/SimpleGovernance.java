/*
 * Copyright 2020 ICONLOOP Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.iconloop.score.example;

import score.Address;
import score.Context;
import score.ArrayDB;
import score.BranchDB;
import score.annotation.External;


// class Proposal {
//     static ArrayDB<Address> For = Context.newArrayDB("For", Address.class);
//     static ArrayDB<Address> Against = Context.newArrayDB("Against", Address.class);
//     static ArrayDB<Address> Abstain = Context.newArrayDB("Abstain", Address.class);
// }

public class SimpleGovernance {
    public String title;
    public String description;

    public SimpleGovernance(String title, String description) {
        this.title = title;
        this.description = description;
    }

    BranchDB<String, ArrayDB<Address>> proposals = Context.newBranchDB("proposals", Address.class);

    ArrayDB<Address> voted = Context.newArrayDB("voted", Address.class);
    

    private boolean checkVoted(Address address) {
        for (int i = 0; i < this.voted.size(); i++) {
            if (this.voted.get(i).equals(address)) {
                return true;
            }
        }
        return false;
    }

    @External()
    public void Vote(String proposal) {
        Context.require(
            proposal.equals("For") ||
            proposal.equals("Against") ||
            proposal.equals("Abstain")
        );
        Context.require(!checkVoted(Context.getCaller()));
        proposals.at(proposal).add(Context.getCaller());
        voted.add(Context.getAddress());
    }

    @External(readonly = true)
    public int getVoteCount(String proposal) {
        Context.require(
            proposal.equals("For") ||
            proposal.equals("Against") ||
            proposal.equals("Abstain")
        );
        return proposals.at(proposal).size();
    }
}