## Migrate ng@4 to ng@13

```
ng new test-recipes
```

replace all /src folder in ng@13

```
ng serve
```

see problems

- rxjs/\*
- HttpClientModule
- TS Strict Class Initialization (https://www.angularjswiki.com/angular/property-has-no-initializer-and-is-not-definitely-assigned-in-the-constructor/)
- return type math Observable (https://bobbyhadz.com/blog/typescript-no-overload-matches-this-call)

https://bobbyhadz.com/blog/typescript-no-overload-matches-this-call
