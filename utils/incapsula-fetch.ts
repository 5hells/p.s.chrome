import { load, schema } from '../../configshare/index.ts';
import { parseSync } from 'oxc-parser';
import { fetch } from 'undici';
import UserAgent from 'user-agents';
import p from 'fast-html-parser';
import { writeFileSync } from 'node:fs';
import type * as estree from "estree";
import * as esprima from 'esprima';
import * as escodegen from 'escodegen';
import { JSDOM } from 'jsdom';

console.log(load('psp9000'));

let s: any = schema(load('psp9000'))
            .string('ps_base', 'default_base')
            .string('guardian', "false")
            .section('env', (env) =>
                env
                    .string('NODE_ENV', 'production')
                    .number('port', 8080)
            ).build();
s.guardian = s.guardian === "true" ? true : false;

const ps = s.ps_base;

const g = await (await fetch("https://" + ps + `.powerschool.com/${s.guardian ? "public" : "teachers"}/`, {
    headers: {
        "User-Agent": new UserAgent().toString(),
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "Accept-Language": "en-US,en;q=0.9",
        "Connection": "keep-alive",
        "Upgrade-Insecure-Requests": "1",
        "Sec-Ch-Ua": "\"Not.A/Brand\";v=\"8\", \"Chromium\";v=\"120\", \"Google Chrome\";v=\"120\"",
        "Sec-Ch-Ua-Mobile": "?0",
        "Sec-Ch-Ua-Platform": "\"Windows\""
    }
})).text();
const ua = new UserAgent().toString();


export async function download(): Promise<estree.Statement[] | undefined> {
    const doc = p.parse(g);
    const reese84 = doc.querySelector("head")?.querySelectorAll("script")[0];
    let _1 = null;
    if (reese84) {
        const reese84_url = "https://" + ps + ".powerschool.com" + reese84.attributes.src;
        const reese84_resp = await fetch(reese84_url, {
            headers: {
                "User-Agent": ua,
                "Referer": "https://" + ps + `.powerschool.com/${s.guardian ? "public" : "teachers"}/`
            }
        });
        const reese84_js = await reese84_resp.text();
        const reese84_ast = esprima.parseScript(reese84_js, {
            range: true,
            tolerant: true,
            comment: true,
            tokens: true
        });
        return reese84_ast.body! as estree.Statement[];
    }
}

// Script appends resource to end of body that retrieves cookie for session

if (import.meta.main) {
    await download();
}