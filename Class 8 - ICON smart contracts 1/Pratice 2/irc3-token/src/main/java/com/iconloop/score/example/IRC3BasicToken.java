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

import com.iconloop.score.token.irc3.IRC3Basic;
import score.Address;
import score.Context;
import score.annotation.External;

import java.math.BigInteger;

public class IRC3BasicToken extends IRC3Basic {
    public IRC3BasicToken(String _name, String _symbol) {
        super(_name, _symbol);
    }

    // DictDB<Address, BigInteger> balances = Context.newDictDB("balances", BigInteger.class);
    // var balance = BigInteger.valueOf(1_000_000);
    // balances.set(Context.getOwner(), balance);
    // Context.require(balances.get(Context.getOwner()).equals(balance));

    Hashtable<BigInteger, String> tokenStore = new Hashtable<BigInteger, String>();

    @External
    public void mint(BigInteger _tokenId) {
        // simple access control - only the contract owner can mint new token
        Context.require(Context.getCaller().equals(Context.getOwner()));
        tokenStore.put(_tokenId.toString(), "http://127.0.0.1:9082/api/v3/token/" + _tokenId.toString());
        super._mint(Context.getCaller(), _tokenId);
    }

    @External
    public void burn(BigInteger _tokenId) {
        // simple access control - only the owner of token can burn it
        Address owner = ownerOf(_tokenId);
        Context.require(Context.getCaller().equals(owner));
        super._burn(_tokenId);
    }

    @External
    public String getUri(BigInteger _tokenId) {
        return tokenStore.get(_tokenId.toString());
    }
}