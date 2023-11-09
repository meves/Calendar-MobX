import { observer } from "mobx-react-lite";
import React from "react";
import { Button } from "@mantine/core"

export const MyPage = observer(() => {
    return (
        <div>
            MyPage
            <Button variant="outline" color="indigo">Hello</Button>
        </div>
    )
})

MyPage.displayName = "MyPage"


function Demo() {
    return <Button>Hello</Button>
}