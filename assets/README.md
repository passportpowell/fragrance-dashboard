# Photography and illustration sources

`bottles/cropped/` contains existing crops of the owner's supplied bottle photographs. These show owned bottles rather than the designer fragrance inspiring a clone. `bottles/user_photos/` preserves original editing inputs and is excluded from production output. No originals were deleted.

The five SVG bottle illustrations in `bottles/` are original project fallback artwork. The build explicitly lists these filenames.

`bottles/studio/` contains historical third-party packshots collected from retailer/Fragrantica sources. Permissions and authenticity have not been independently verified. They remain preserved as source material but are excluded from production output and are not covered by the code's MIT grant.

The MIT license applies to project code. Photography rights remain with their respective owners; possession of a source file does not establish permission to redistribute it. Original photos may remain publicly accessible in GitHub repository history. Excluding them from the deployment does not remove that history; no history rewrite was performed.

Historical crop and download scripts now refuse writes. To make new crops, use an image editor or a reviewed root-relative pipeline, preserve source photographs, save only intended publication crops and run the allowlisted build.
