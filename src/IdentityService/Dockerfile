FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app
EXPOSE 80

# copy all .csproj files and restore as distinct layers. Use of the same copy command
# for every project is to ensure that the cache is used correctly.

COPY CourseCastle.sln CourseCastle.sln
COPY src/CourseService/CourseService.csproj src/CourseService/CourseService.csproj
COPY src/SearchService/SearchService.csproj src/SearchService/SearchService.csproj
COPY src/GatewayService/GatewayService.csproj src/GatewayService/GatewayService.csproj
COPY src/Contracts/Contracts.csproj src/Contracts/Contracts.csproj
COPY src/IdentityService/IdentityService.csproj src/IdentityService/IdentityService.csproj
COPY src/PaymentService/PaymentService.csproj src/PaymentService/PaymentService.csproj

# Restore package deps

RUN dotnet restore CourseCastle.sln

# Copy the app folders over

COPY src/IdentityService src/IdentityService
WORKDIR /app/src/IdentityService
RUN dotnet publish -c Release -o /app/src/out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/src/out .
ENTRYPOINT ["dotnet", "IdentityService.dll"]