'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { EditProfile } from './_components/EditProfile'
import { Preferences } from './_components/Preferences'
import { Security } from './_components/Security'

export default function SettingsPage() {
  return (
    <Tabs defaultValue="edit-profile" className="w-full">
      <TabsList className="flex h-auto w-full justify-start gap-8 rounded-none border-0 border-b border-border bg-transparent p-0">
        <TabsTrigger
          value="edit-profile"
          className="relative h-auto rounded-none border-0 bg-transparent px-0 pb-4 pt-0 font-medium text-muted-foreground after:absolute after:bottom-[-1px] after:left-0 after:right-0 after:hidden after:h-[2px] after:rounded-full after:bg-foreground after:content-[''] data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none data-[state=active]:after:block"
        >
          Edit Profile
        </TabsTrigger>
        <TabsTrigger
          value="preferences"
          className="relative h-auto rounded-none border-0 bg-transparent px-0 pb-4 pt-0 font-medium text-muted-foreground after:absolute after:bottom-[-1px] after:left-0 after:right-0 after:hidden after:h-[2px] after:rounded-full after:bg-foreground after:content-[''] data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none data-[state=active]:after:block"
        >
          Preferences
        </TabsTrigger>
        <TabsTrigger
          value="security"
          className="relative h-auto rounded-none border-0 bg-transparent px-0 pb-4 pt-0 font-medium text-muted-foreground after:absolute after:bottom-[-1px] after:left-0 after:right-0 after:hidden after:h-[2px] after:rounded-full after:bg-foreground after:content-[''] data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none data-[state=active]:after:block"
        >
          Security
        </TabsTrigger>
      </TabsList>
      <TabsContent value="edit-profile">
        <EditProfile />
      </TabsContent>
      <TabsContent value="preferences">
        <Preferences />
      </TabsContent>
      <TabsContent value="security">
        <Security />
      </TabsContent>
    </Tabs>
  )
}
